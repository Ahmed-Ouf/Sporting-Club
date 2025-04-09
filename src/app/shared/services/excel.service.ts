import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private fileSaver: FileSaverService) { }

  exportJsonToExcel(data: any, fileName: string) {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    //custom code 
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: {
        'الورقة الاولي': worksheet
      },
      SheetNames: ['الورقة الاولي'],
      Workbook: { Views: [{ RTL: true }] }
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE });
    this.fileSaver.save(blobData, fileName);

  }
}
