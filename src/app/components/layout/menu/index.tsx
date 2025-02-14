import Link from "next/link"

export const Menu: React.FC = () => {
    return (
        <aside className="colum is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">
                Minhas Vendas
            </p>
            <MenuItem href="/" label="Home"/>
            <MenuItem href="/" label="Cadastro"/>
        </aside>
    )
}

interface MenuItemProps {
    href: string,
    label: string
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    return(
        <li>
            <Link legacyBehavior href={props.href}>
                <a>
                    <span className="icon">
                        {props.label}
                    </span>
                </a>
            </Link>           
        </li>
    )
}