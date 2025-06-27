import { ReactNode } from "react";
import { Menu } from "./menu";
import { Alert, Message } from "../common/message";

interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
  mensagens?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className="App">
      <section className="main-content columns is-fullheight">
        <Menu />
        <div className="container colum-is 10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-ttile">{props.titulo}</p>
              </div>
              <div className="card-content">
                <div className="card-content">
                  {props.mensagens &&
                    props.mensagens.map((msg) => <Message {...msg} />)}
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
