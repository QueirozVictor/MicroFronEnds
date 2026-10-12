
import { useEffect, useState } from "react"
import Image from "next/image";
import style from '../styles/MIcropedido.module.css'

export default function Pedido() {

    //Cria o Array que iremos trabahar.
    const [itens, setItens] = useState([]);
    
    //Função para adicionar mais um item ao carrinho.
    const somaItem = (idx) =>{
        //Retorna os itens do nosso Array e gera um novo array com os itens ja existentes porem com a quantidade alterada do item que foi selecionado no evento.
      setItens((prev) => prev.map((item, i) => {
          return  i === idx ? {...item, quantidade: item.quantidade + 1} : item//condição para caso não haja alteração, ele retornar a mesma lista.
        })
    );
    };

    //Função para diminuir a quantidade de itens escolhidos.
    const diminuiItem = (idx) => {
        //Retorna os itens do nosso Array e gera um novo array com os itens ja existentes porem com a quantidade alterada do item que foi selecionado no evento.
        setItens((prev) => prev.map((item, i) => {
              return  i === idx ? {...item, quantidade: Math.max(1, item.quantidade - 1 )} : item
              //Math.max é usada para determinar o menor valor permitido e retornar o maior valor recebido.
            })
        )
    };

    //Função para gerar um total no valor do pedido.
    //Reduce percorre nosso Array e executa os parametros que escolhemos. Nesse caso, estamos determinando que ele pegue o valor de cada item + a quantidade e some o valor total. Sempre que a quntidade mudar, ele retorna um novo valor iniciando com 0.
    const totalPedido = itens.reduce((total,item) => {
        return total + item.valor * item.quantidade;
    }, 0 );

    //Aqui iremos alterar nosso State inicial. 
    //A estrutura do useEffect aqui esta usando uma função anonima para gerar a mudança de estado () => {}.
    useEffect(() => {

        //A função anonima recebe como argumento (e) que é nosso evento.
        const receberPedido = (e) => {
            //Recebe os detalhes do produto vindo do evento.
            const produto = e.detail;

            //Aqui nos recebemos nosso array e usamos o argumento (prev) => {} para sinalizar o que ja esta la.
            setItens((prev) => {
                //Metodo find() verifica se ja existe o item correspondente com o argumento (item) => que verifica se o item.id é exatamente igual ao produto.id recebido
                const itemExistente = prev.find(
                    (item) => item.id === produto.id
                );
                //Condição para caso o item ja esteja no carrinho, ele não seja adicionado novamente, em vez disso, acrescente 1 a contagem no carrinho.
                if (itemExistente) {
                    // O map() cria um novo array.
                    // Se o id corresponder, cria um novo objeto com a quantidade atualizada.
                    // Caso contrário, mantém a referência do objeto original daquele item.
                    return prev.map((item) => item.id === produto.id ? {
                        ...item, quantidade: item.quantidade + 1,
                    }: item
                );
            }
            //quando as condições do nosso if nao se aplicam, esse return devolve o novo array para o setItens e acrescenta a propriedade quantidade: 1 para que seja exibido na tela
            return [
                ...prev,
                { ...produto, quantidade: 1}
            ]
            })
        }
        //Registra um ouvinte para o evento "adicionarPedido"
        //Quando o evento é disparado, executa a função receberPedido.
        window.addEventListener("adicionarPedido", receberPedido);

        // Função de limpeza do useEffect.
        // Remove o ouvinte quando o componente é desmontado,
        // evitando que ele continue registrado desnecessariamente.
        return () => {
            window.removeEventListener("adicionarPedido", receberPedido)
        }
    },[]);

    return(
        <div className={style.pedido}>
            <h2 className={style.tituloPedido}>Pedido</h2>

                {itens.length === 0 ? (<p className={style.pNaoEncontrado}>Nenhum Item adicionado</p>) : (
                    <div className={style.listaPedido}>
                        <ul className={style.cardPedido} >
                            {itens.map((item, idx) => (
                                <li
                                className={style.pedidoItem}
                                key={item.id}>
                                    <Image
                                    className={style.itemImagem}
                                    src={item.imagem}
                                    alt={`imagem do ${item.imagem}`}
                                    width={100}
                                    height={100}
                                    />
                                    <div className={style.itemDesc}>
                                        <div className={style.itemInfo}>
                                            <h2 className={style.itemDescTitulo}>{item.nome}</h2>
                                            <span>{item.valor.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL"
                                            })}</span>
                                        </div>

                                        <div className={style.count}>
                                            <button
                                            className={style.btnCount}
                                            onClick={() => diminuiItem(idx)}>
                                                -
                                            </button>

                                            <span className={style.itemQtd}>{item.quantidade}</span>

                                            <button
                                            className={style.btnCount}
                                            onClick={() => somaItem(idx)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            <div className={style.infoTotal}>
                <span>Total:</span>

                <span className={style.infoValor}>
                    {totalPedido.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </div>
        </div>
    )
}


