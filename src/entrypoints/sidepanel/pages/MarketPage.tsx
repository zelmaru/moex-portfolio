import { MoexTicker } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MarketPage = () => {
  const MOCK_MOEX_DATA: MoexTicker[] = [
    { id: '1', ticker: 'SBER', name: 'Сбербанк', price: 264.35, percentChange24h: 1.15 },
    { id: '2', ticker: 'GAZP', name: 'Газпром', price: 132.8, percentChange24h: -0.62 },
    { id: '3', ticker: 'LKOH', name: 'Лукойл', price: 6850.0, percentChange24h: 0.0 },
    { id: '4', ticker: 'YNDX', name: 'Яндекс', price: 3920.4, percentChange24h: 2.45 },
    {
      id: '5',
      ticker: 'ROSN',
      name: 'Роснефть',
      price: 482.15,
      percentChange24h: -1.3,
    },
    {
      id: '6',
      ticker: 'GMKN',
      name: 'ГМК Норильский никель',
      price: 142.5,
      percentChange24h: 0.78,
    },
    { id: '7', ticker: 'IRAO', name: 'Интер РАО ЕЭС', price: 3.85, percentChange24h: -2.1 },
  ];

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Тикер</TableHead>
            <TableHead className="text-right">Цена</TableHead>
            <TableHead className="text-right">24ч</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_MOEX_DATA.map((row) => {
            const isPositive = row.percentChange24h > 0;
            const isNegative = row.percentChange24h < 0;

            return (
              <TableRow key={row.id}>
                <TableCell className="flex flex-col">
                  <span className="font-bold uppercase tracking-wide">{row.ticker}</span>
                  <span title={row.name} className="block truncate text-xs text-muted-foreground">
                    {row.name}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  {row.price.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    minimumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell
                  className={`text-right ${
                    isPositive
                      ? 'text-green-500'
                      : isNegative
                        ? 'text-red-500'
                        : 'text-muted-foreground'
                  }`}
                >
                  {isPositive && <span className="mr-0.5 text-xs">▲</span>}
                  {isNegative && <span className="mr-0.5 text-xs">▼</span>}
                  <span>{Math.abs(row.percentChange24h).toFixed(2)}%</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default MarketPage;
