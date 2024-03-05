import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const splitData = (data) => {
  
    return data.map(item => {
        return {
            userName: `${item?.user?.firstname} ${item?.user?.lastname}`,
            mobileNumber: item?.user?.mob_number,
            userRole: item?.user?.role,
            language: item?.user?.language,
            totalQuestions: item?.assignment?.totalquestions,
            correctAnswers: item?.assignment?.correctanswer,
            wrongAnswers: item?.assignment?.wronganswer,
            percentage: item?.assignment?.percentage !== undefined ? parseFloat(item?.assignment?.percentage).toFixed(2) : undefined,
        };
    });
};

const ExportAssignmentRecord = (data, filename) => {

    const splittedData = splitData(data)
    const WorkSheet = XLSX.utils.json_to_sheet(splittedData)
    const WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(WorkBook, WorkSheet, "Sheet 1")
    const excelBuffer = XLSX.write(WorkBook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `${filename}.xlsx`);
}

export default ExportAssignmentRecord