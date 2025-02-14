import { Menu } from "./menu"
export const Layout: React.FC = () => {
    return(
        
        <div className="App">
            <section className="main-content columns is-fullheight">
                <Menu/>
                <div className="container colum-is 10">
                    <div className="section">
                        <div className="card">
                            <div className="card-header">
                                <p className="card-header-ttile">
                                    Cadastro
                                </p>
                            </div>
                            <div className="card-content">
                                <p className="card-content">
                                    Conteúdo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}