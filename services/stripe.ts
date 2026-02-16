
import { SplitInfo } from '../types';

/**
 * LÓGICA DE CONTABILIDADE INTELIGENTE CONSCIUS
 * 
 * Este módulo garante que a Conscius Saúde Mental Integral seja tributada apenas
 * sobre a sua comissão (Intermediação de Negócios), e não sobre o faturamento total (GMV).
 */

const STRIPE_FEE_PERCENT = 0.0399; // 3.99%
const STRIPE_FIXED_FEE = 0.50; // R$ 0,50
const CONSCIUS_TAKE_RATE = 0.15; // 15% de comissão Conscius

export const calculateSplit = (totalAmount: number): SplitInfo => {
  const stripeFee = (totalAmount * STRIPE_FEE_PERCENT) + STRIPE_FIXED_FEE;
  
  // A comissão da Conscius é calculada sobre o valor total bruto
  const consciusCommission = totalAmount * CONSCIUS_TAKE_RATE;
  
  // O fornecedor recebe o restante. No Stripe Connect, esse valor vai direto para a conta do parceiro.
  const providerShare = totalAmount - stripeFee - consciusCommission;

  return {
    total: totalAmount,
    stripeFee,
    consciusCommission,
    providerShare
  };
};

export const createTransaction = async (amount: number, providerId: string) => {
  const split = calculateSplit(amount);
  console.log(`[STRIPE CONNECT] Iniciando transação com split:`, split);
  
  // Simula o fluxo: O valor é capturado do cliente, a taxa do Stripe é retida,
  // a comissão Conscius vai para a conta da plataforma e o share do fornecedor vai para a conta conectada.
  return {
    paymentIntentId: `pi_mock_${Math.random().toString(36).substring(7)}`,
    split,
    status: 'AUTHORIZED' // Fica autorizado para captura posterior (importante para farmácias)
  };
};

export const captureFunds = async (intentId: string) => {
  console.log(`[STRIPE CONNECT] Capturando fundos para ${intentId}. Split executado.`);
  return { success: true, nfeStatus: 'SENT_TO_WHATSAPP' };
};
