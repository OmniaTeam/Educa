package com.omnia.scientia.groups.favorites;

import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.dto.UserSetFavorite;
import com.omnia.scientia.exceptions.AlreadyExistException;
import com.omnia.scientia.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
@Slf4j
public class FavoritesControllers {

    final private FavoritesRepository favoritesRepository;


    @GetMapping("/get/id/{favoritesId}")
    ResponseEntity<?> getWithId(@PathVariable Long favoritesId){
        var response =  favoritesRepository.findById(favoritesId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(favoritesId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/user")
    ResponseEntity<?> getWithUser(Authentication authentication){
        UserEntity user =  (UserEntity) authentication.getPrincipal();
        var response =  favoritesRepository.findAllByUserId(user.getId());
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(user.getId(), HttpStatusCode.valueOf(404));
    }

    @PostMapping("/set/favorite")
    ResponseEntity<?> setFavorite(@RequestBody UserSetFavorite userSetFavorite, Authentication authentication){
        UserEntity user =  (UserEntity) authentication.getPrincipal();

        Optional<FavoritesEntity> favoritesEntityOptional = favoritesRepository.findByTypeAndObjectIdAndUserId(userSetFavorite.getType(), userSetFavorite.getId(), user.getId());
        if (favoritesEntityOptional.isPresent()) {
            throw new AlreadyExistException("favorite");
        }
        FavoritesEntity favorites = new FavoritesEntity(userSetFavorite.getType(), userSetFavorite.getId(), user.getId());
        favoritesRepository.save(favorites);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/unset/favorite")
    ResponseEntity<?> unsetFavorite(@RequestBody UserSetFavorite userSetFavorite, Authentication authentication){
        UserEntity user =  (UserEntity) authentication.getPrincipal();

        Optional<FavoritesEntity> favoritesEntityOptional = favoritesRepository.findByTypeAndObjectIdAndUserId(userSetFavorite.getType(), userSetFavorite.getId(), user.getId());
        if (favoritesEntityOptional.isEmpty()) {
            throw new NotFoundException("favorite");
        }
        favoritesRepository.delete(favoritesEntityOptional.get());
        return ResponseEntity.ok().build();
    }



}
