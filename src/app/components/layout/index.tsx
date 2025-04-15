import { ReactNode } from "react";
import { Menu } from "./menu";
interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (propos: LayoutProps) => {
  return (
    <div className="App">
      <section className="main-content columns is-fullheight">
        <Menu />
        <div className="container colum-is 10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-ttile">{propos.titulo}</p>
              </div>
              <div className="card-content">
                <div className="card-content">{propos.children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
