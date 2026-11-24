import { Pedido } from "../dto/pedido";
import { PedidoApi } from "../dto/pedido-api";

export class PedidosMapper {

    public toPedido(pedidoApi: PedidoApi): Pedido {
        const pedido = new Pedido();
        pedido.id = pedidoApi?.id;
        pedido.nombre = pedidoApi?.nombreCliente;
        pedido.tipo = pedidoApi?.tipoPedido?.toLowerCase();
        pedido.total = pedidoApi?.total;
        pedido.medioPago = pedidoApi?.medioPago;

        return pedido;
    }

    public toPedidoApi(pedido: Pedido): PedidoApi {
        const pedidoApi = new PedidoApi();
        pedidoApi.nombreCliente = pedido?.nombre;
        pedidoApi.tipoPedido = pedido?.tipo;
        pedidoApi.total = pedido?.total;
        pedidoApi.medioPago = pedido?.medioPago;
        pedidoApi.fecha = new Date().toISOString();
        pedidoApi.icono = pedido?.tipo?.toLowerCase() === 'combo' ? 'combo' : 'hamburguesa';
        pedidoApi.imagenUrl = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png';
        return pedidoApi;
    }
}
