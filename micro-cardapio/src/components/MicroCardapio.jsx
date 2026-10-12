import style from '../styles/MicroCardapio.module.css'
import { item } from '../data/itens'
import Image from 'next/image'

export default function Cardapio() {

    

    return(
        <div className={style.base}>
            <h2 className={style.title}>Cardápio</h2>
            
            <ul className={style.list}>
                {
                    item.map((p) => (
                        <li key={p.id}
                            className={style.card}
                            >

                            <Image 
                            className={style.cardImage}
                            src={p.imagem} 
                            width={75} 
                            height={75} 
                            alt={`Imagem do ${p.nome}`}
                            />

                            <div className={style.cardDesc}>
                                <h3 className={style.cardTitle}>{p.nome}</h3>
                                <p>{p.descricao}</p>
                                <button
                                className={style.cardBtn}
                                onClick={() => {
                                    window.dispatchEvent(new CustomEvent("adicionarPedido", {detail: p}))
                                }}>+ Adicionar</button>
                            </div>
                            
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}