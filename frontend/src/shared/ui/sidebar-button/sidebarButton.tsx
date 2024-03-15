import './styles.scss';

interface SidebarButtonProps {
    buttonValue : string;
    onClickHandler : () => void
}

export const SidebarButton = (props: SidebarButtonProps) => {
    return <input 
        type="button" 
        className="sidebar-button" 
        value={props.buttonValue}
        onClick={props.onClickHandler}
    />
}