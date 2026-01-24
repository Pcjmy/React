// 定义数据类型
export interface Datum {
  name: string;
  color: string;
  size: number;
}

// 模拟数据生成函数
export const generateData = (count: number): Datum[] => {
  const colors = ['#ff9999', '#99ccff', '#99ff99', '#ffcc99', '#cc99ff'];
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  
  return Array.from({ length: count }, (_, index) => ({
    name: `${names[index % names.length]} ${index}`,
    color: colors[index % colors.length],
    size: 50 + (index % 5) * 25 // 动态高度：50, 75, 100, 125, 150
  }));
};