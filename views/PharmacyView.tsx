
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

export const PharmacyView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-8821',
      customerId: 'CUST-001',
      customerName: 'Roberto Silva',
      productId: 'PROD-01',
      productName: 'Fluoxetina 20mg - Conscius Pharma',
      amount: 85.50,
      /* Fix: Changed AWAITING_PHARMACY to AWAITING_PHARMACY_APPROVAL as defined in types.ts */
      status: OrderStatus.AWAITING_PHARMACY_APPROVAL,
      prescriptionUrl: 'https://picsum.photos/400/600',
      createdAt: '2023-10-24 14:30',
      /* Fix: Changed supplierShare to providerShare as defined in SplitInfo interface */
      split: { providerShare: 72.00, stripeFee: 3.40, consciusCommission: 10.10, total: 85.50 }
    },
    {
      id: 'ORD-8822',
      customerId: 'CUST-002',
      customerName: 'Mariana Costa',
      productId: 'PROD-02',
      productName: 'Sertralina 50mg',
      amount: 112.00,
      status: OrderStatus.APPROVED,
      createdAt: '2023-10-24 15:10',
      /* Fix: Changed supplierShare to providerShare as defined in SplitInfo interface */
      split: { providerShare: 95.00, stripeFee: 4.50, consciusCommission: 12.50, total: 112.00 }
    }
  ]);

  const handleAction = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (status === OrderStatus.APPROVED) {
      alert('Pagamento CAPTURADO no Stripe e NF-e emitida com sucesso via WhatsApp.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Portal do Fornecedor</h2>
        <p className="text-slate-500">Gestão técnica de receitas e compliance farmacêutico.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pedido</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Receita</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">#{order.id}</p>
                    <p className="text-xs text-slate-400">{order.createdAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{order.customerName}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {order.productName}
                  </td>
                  <td className="px-6 py-4">
                    {order.prescriptionUrl ? (
                      <button className="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Ver Documento
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">Não necessária</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === OrderStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                      order.status === OrderStatus.REJECTED ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {/* Fix: Changed AWAITING_PHARMACY to AWAITING_PHARMACY_APPROVAL */}
                      {order.status === OrderStatus.AWAITING_PHARMACY_APPROVAL ? 'Aguardando Revisão' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* Fix: Changed AWAITING_PHARMACY to AWAITING_PHARMACY_APPROVAL */}
                    {order.status === OrderStatus.AWAITING_PHARMACY_APPROVAL && (
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleAction(order.id, OrderStatus.REJECTED)}
                          className="px-3 py-1 bg-white border border-rose-200 text-rose-600 rounded-md text-xs font-bold hover:bg-rose-50"
                        >
                          Recusar
                        </button>
                        <button 
                          onClick={() => handleAction(order.id, OrderStatus.APPROVED)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold hover:bg-indigo-700 shadow-sm"
                        >
                          Aprovar & Capturar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
