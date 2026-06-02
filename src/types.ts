export interface ProductionOrder {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productType: string;
  fabricType: string;
  color: string;
  classification: string;
  quantity: number;
  sizeDetails: string;
  deliveryMethod: string;
  codAmount: string;
  deliveryDate: string;
  notes: string;
  productionNotes?: string;
  createdAt: string;
  designImage?: string;
}
