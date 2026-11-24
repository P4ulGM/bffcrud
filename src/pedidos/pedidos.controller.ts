import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { Pedido } from '../dto/pedido';
import { PedidosService } from './pedidos.service';
import { PedidosMapper } from '../utils/pedidos-mapper';

@Controller('pedidos')
export class PedidosController {

    constructor(private readonly pedidosService: PedidosService) {}

    @Get("/")
    async getPedidos(): Promise<Pedido[]> {
        const pedidosApi = await this.pedidosService.getPedidos();
        const mapper = new PedidosMapper();
        const pedidos = pedidosApi.map((pa) => mapper.toPedido(pa));

        return pedidos;
    }

    @Get('/:id')
    async getPedidoById(@Param('id') id: string): Promise<Pedido> {
        const pedidoApi = await this.pedidosService.getPedidoById(id);
        const mapper = new PedidosMapper();
        return mapper.toPedido(pedidoApi);
    }

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    async createPedido(@Body() pedido: Pedido): Promise<Pedido> {
        const mapper = new PedidosMapper();
        const pedidoApiPayload = mapper.toPedidoApi(pedido);
        const pedidoCreadoApi = await this.pedidosService.createPedido(pedidoApiPayload);
        
        return mapper.toPedido(pedidoCreadoApi);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deletePedido(@Param('id') id: string): Promise<{ message: string }> {
        await this.pedidosService.deletePedido(id);
        return { message: `Pedido con id ${id} eliminado exitosamente` };
    }
}
