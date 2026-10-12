import React from "react";
import style from '../styles/Index.module.css'

const Cardapio = React.lazy(() => import("cardapio/Cardapio"));
const Pedido = React.lazy(() => import("pedido/Pedido"));

export default function Home() {
  return(
    <div className={style.base}>
        <h1 className={style.title}>Micro FrontEnd</h1>
        <React.Suspense fallback={<p>Carregando...</p>}>
        <div className={style.main}>
            <Cardapio/>
            <Pedido/>
        </div>
        </React.Suspense>

        <footer className={style.footer}>
          <p>2026 MicroFrontEnd-Todos os direitos reservados</p>
        </footer>
    </div>
      

  )
}