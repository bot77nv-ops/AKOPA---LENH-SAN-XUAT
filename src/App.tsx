/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ProductionOrder } from './types';
import { OrderForm } from './components/OrderForm';
import { PrintView } from './components/PrintView';
import { Scissors, Printer, ArrowLeft, Download } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';

export default function App() {
  const [currentOrder, setCurrentOrder] = useState<ProductionOrder | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) {
      alert('Không tìm thấy nội dung để xuất.');
      return;
    }
    
    setIsExporting(true);

    try {
      const element = printRef.current;

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Ignore small remainders to prevent blank extra pages (up to 15mm)
      while (heightLeft > 15) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`lenh-san-xuat-${currentOrder?.orderCode || 'AKOPA'}.pdf`);
      
    } catch (error) {
      console.error('Lỗi khi xuất PDF:', error);
      alert('Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });


  return (
    <div className="min-h-screen bg-gray-50 font-sans print:bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#002f87] rounded-xl flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-[#002f87] tracking-tight">AKOPA <span className="font-medium text-gray-400">| Lệnh Sản Xuất</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
        
        {!currentOrder ? (
          <div className="space-y-6">
            <OrderForm onSubmit={(order) => setCurrentOrder(order)} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print:hidden">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Xem Trước Lệnh Sản Xuất</h2>
                <p className="text-gray-500 text-sm mt-1">Kiểm tra thông tin trước khi tải file hoặc in lệnh.</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentOrder(null)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5 opacity-70" />
                  Sửa Lại
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold shadow-sm shadow-green-500/20 focus:ring-4 focus:ring-green-500/20 disabled:opacity-75"
                >
                  <Download className={`w-5 h-5 ${isExporting ? 'animate-bounce' : ''}`} />
                  {isExporting ? 'Đang tạo PDF...' : 'Xuất file PDF'}
                </button>
                <button
                  onClick={handlePrint}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold shadow-sm shadow-blue-500/20 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-75"
                >
                  <Printer className="w-5 h-5" />
                  {isExporting ? 'Đang tải...' : 'In Lệnh'}
                </button>
              </div>
            </div>

            <div className="print-container relative z-0 flex justify-center overflow-x-auto w-full py-4 print:py-0">
               <div ref={printRef} className="production-order-preview shadow-lg border border-gray-200 print:shadow-none print:border-none shrink-0 bg-white">
                 <PrintView order={currentOrder} />
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

