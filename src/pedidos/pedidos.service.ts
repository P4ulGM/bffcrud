import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PedidoApi } from '../dto/pedido-api';
import axios from 'axios';

@Injectable()
export class PedidosService {
    private readonly apiUrl = 'http://localhost:3001/api/pedidos';

    async getPedidos(): Promise<PedidoApi[]> {
        try {
            const pedidosApi = await axios.get<PedidoApi[]>(this.apiUrl);
            return pedidosApi.data;
        } catch (ex) {
            return [];
        }
    }

    async getPedidoById(id: string): Promise<PedidoApi> {
        try {
            const response = await axios.get<PedidoApi>(`${this.apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            throw new HttpException(
                `Pedido con id ${id} no encontrado en el servicio mock`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async createPedido(pedidoApi: PedidoApi): Promise<PedidoApi> {
        try {
            const response = await axios.post<PedidoApi>(this.apiUrl, pedidoApi);
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Error al crear el pedido en el servicio mock',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deletePedido(id: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${id}`);
        } catch (error) {
            throw new HttpException(
                `Error al eliminar el pedido con id ${id} en el servicio mock`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
