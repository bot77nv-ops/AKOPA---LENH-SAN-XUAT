import React from 'react';
import { ProductionOrder } from '../types';

interface PrintViewProps {
  order: ProductionOrder;
}

export function PrintView({ order }: PrintViewProps) {
  return (
    <div className="text-black h-full flex flex-col">
      
      {/* --- PAGE 1 --- */}
      <div className="flex flex-col justify-between print:min-h-0" style={{ minHeight: 'calc(297mm - 30mm)' }}>
        <div>
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#002f87] text-white font-bold text-3xl flex items-center justify-center rounded-xl italic pr-1">A</div>
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-[#002f87] mb-1">Đồng Phục <span className="text-[#ff6b00]">AKOPA</span></h1>
                <div className="mt-2 text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold block text-base mb-1 text-gray-900">Xưởng Sản Xuất Đồng Phục AKOPA</span>
                  <span className="font-medium">Hotline:</span> 08.6840.3124 - 0902.479.769<br/>
                  <span className="font-medium">Website:</span> www.dongphucakopa.com<br/>
                  <span className="font-medium">Địa chỉ:</span> Số 90 Nguyễn Đình Thụ - Quy Nhơn Nam<br/>- Gia Lai
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-black mb-2">Lệnh Sản Xuất</h2>
              <div className="inline-block border border-black px-4 py-2 text-left">
                <p className="text-sm"><span className="font-semibold inline-block w-24">Mã đơn:</span> {order.orderCode}</p>
                <p className="text-sm"><span className="font-semibold inline-block w-24">Ngày tạo:</span> {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                <p className="text-sm"><span className="font-semibold inline-block w-24">Người lập:</span> Admin</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <section>
              <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">I. Thông Tin Khách Hàng</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                <div>
                  <span className="font-medium text-gray-600 block text-sm">Khách hàng / Đơn vị:</span>
                  <span className="font-semibold text-base">{order.customerName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 block text-sm">Số Điện Thoại:</span>
                  <span className="font-semibold text-base">{order.customerPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-gray-600 block text-sm">Địa chỉ giao hàng:</span>
                  <span className="font-semibold text-base">{order.customerAddress}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">II. Chi Tiết Sản Phẩm</h3>
              <table className="w-full text-left border-collapse border border-gray-400 mb-2">
                <thead>
                  <tr className="bg-gray-100 uppercase text-xs font-bold tracking-wider">
                    <th className="border border-gray-400 p-2">Loại Sản Phẩm</th>
                    <th className="border border-gray-400 p-2">Phân Loại</th>
                    <th className="border border-gray-400 p-2">Chất Liệu Vải</th>
                    <th className="border border-gray-400 p-2">Màu Sắc</th>
                    <th className="border border-gray-400 p-2 text-center w-24">Tổng SL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 font-medium">{order.productType}</td>
                    <td className="border border-gray-400 p-2 font-medium">{order.classification}</td>
                    <td className="border border-gray-400 p-2 font-medium">{order.fabricType}</td>
                    <td className="border border-gray-400 p-2 font-medium">{order.color}</td>
                    <td className="border border-gray-400 p-2 text-center text-lg font-bold">{order.quantity}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="border border-gray-400 p-3 bg-gray-50/50">
                <span className="font-bold text-sm uppercase mb-1 block">Chi tiết Size:</span>
                <div className="whitespace-pre-wrap text-sm">{order.sizeDetails || <span className="text-gray-400 italic">Không có phân loại size cụ thể</span>}</div>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">III. Yêu Cầu Thiết Kế & Sản Xuất</h3>
              <div className="min-h-[80px] border border-gray-400 p-3 whitespace-pre-wrap bg-gray-50/50 relative text-sm">
                {order.notes || <span className="text-gray-400 italic">Không có ghi chú thêm</span>}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">IV. Thông Tin Giao Hàng & Thanh Toán</h3>
              <div className="grid grid-cols-2 gap-4 border border-gray-400 p-3">
                <div>
                  <span className="font-medium text-gray-600 block text-sm">Ngày giao hàng (Dự kiến):</span>
                  <div className="mt-1 font-bold">{new Date(order.deliveryDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600 block text-sm">Hình thức giao hàng:</span>
                  <div className="mt-1 font-bold">{order.deliveryMethod}</div>
                </div>
                {order.codAmount && (
                  <div className="col-span-2 mt-2 pt-2 border-t border-gray-300 border-dashed">
                    <span className="font-medium text-gray-600 block text-sm">Số tiền thu hộ (COD):</span>
                    <div className="mt-1 font-bold text-lg">{order.codAmount} VNĐ</div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <section className="pt-4">
          <div className="flex justify-between items-center px-12 text-center mt-6 pb-2">
            <div>
              <p className="font-bold mb-12">Phòng Cắt</p>
              <p className="italic text-sm text-gray-500">(Ký & Ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold mb-12">Phòng In/Thêu</p>
              <p className="italic text-sm text-gray-500">(Ký & Ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold mb-12">Phòng May</p>
              <p className="italic text-sm text-gray-500">(Ký & Ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold mb-12">Người Lập Lệnh</p>
              <p className="italic text-sm text-gray-500">(Ký & Ghi rõ họ tên)</p>
            </div>
          </div>
        </section>
      </div>

      {/* --- PAGE 2 --- */}
      <div 
        className="print:mt-0 print:min-h-0 flex flex-col justify-between" 
        style={{ 
          minHeight: 'calc(297mm - 30mm)', 
          marginTop: '30mm',
          pageBreakBefore: 'always'
        }}
      >
        <div>
          {order.designImage && (
            <section>
              <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">V. Hình Ảnh Thiết Kế Đính Kèm</h3>
              <div className="mt-2 border border-gray-400 p-2 flex justify-center">
                <img src={order.designImage} alt="Design" className="max-w-full max-h-[600px] object-contain" />
              </div>
            </section>
          )}
        </div>

        <section className="mt-8">
          <h3 className="font-bold text-lg border-b border-gray-300 pb-1 mb-2">{order.designImage ? 'VI' : 'V'}. Ghi Chú Sản Xuất</h3>
          <div className="min-h-[150px] border border-gray-400 p-3 whitespace-pre-wrap bg-gray-50/50 text-sm">
            {order.productionNotes || <span className="text-gray-400 italic">Không có ghi chú thêm</span>}
          </div>
        </section>
      </div>

    </div>
  );
}
