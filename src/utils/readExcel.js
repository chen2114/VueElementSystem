import XLSX from 'xlsx'

export default function readExcel (file) {
  const types = file.name.substring(file.name.lastIndexOf('.') + 1)
  const fileType = [
    'xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'
  ].some(item => item === types)
  if (!fileType) {
    alert('格式错误！请重新选择')
    return
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const result = []
    reader.readAsBinaryString(file.raw)
    reader.onload = function (e) {
      const data = e.target.result
      const wb = XLSX.read(data, {
        type: 'binary'
      })
      wb.SheetNames.forEach((sheetName) => {
        result.push({
          sheetName: sheetName,
          sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
        })
      })
      resolve(result)
    }
  })
}
