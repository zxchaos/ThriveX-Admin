import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs'
import { MonthlySums, Result } from './chart';

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne = () => {
  const [result, setResult] = useState<Result>({} as Result)
  const [scope, setScope] = useState<"day" | "month" | "year">("day")
  const [startDate, setStartDate] = useState(dayjs(new Date()).subtract(7, "day").format("YYYY/MM/DD"))
  const [endDate, setEndDate] = useState(dayjs(new Date()).format("YYYY/MM/DD"))

  const [options, setOptions] = useState<ApexOptions>({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  })

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: '访客数量',
        data: [],
      },
      {
        name: 'IP数量',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const siteId = import.meta.env.VITE_BAIDU_TONGJI_SITE_ID
    const token = import.meta.env.VITE_BAIDU_TONGJI_ACCESS_TOKEN

    fetch(`/api/rest/2.0/tongji/report/getData?access_token=${token}&site_id=${siteId}&start_date=${startDate}&end_date=${endDate}&metrics=pv_count%2Cip_count&method=overview%2FgetTimeTrendRpt`).then(async res => {
      const { result } = await res.json()
      console.log({ result });
      setResult(result)
    })
  }, [scope])

  useEffect(() => {
    if (!result?.items?.length) return

    switch (scope) {
      case "day":
        const categories_weeks = result.items[0].map((item: string[]) => {
          const year = new Date().getFullYear() + "/"
          return item[0].replace(year, "")
        })

        setOptions((data) => (
          {
            ...data,
            xaxis: { ...options.xaxis, categories: categories_weeks }
          }
        ))

        const pvList_weeks = result.items[1].map((item: number[]) => item[0])
        const ipList_weeks = result.items[1].map((item: number[]) => item[1])
        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: '访客数量',
              data: pvList_weeks,
            },
            {
              name: 'IP数量',
              data: ipList_weeks,
            },
          ],
        }));
        break
      case "month":
        const datesArray: string[][] = result.items[0];
        const valuesArray: (string | number)[][] = result.items[1];

        const monthlySums: MonthlySums = {};

        datesArray.forEach((dateArray, index) => {
          const date: string = dateArray[0];
          const [year, month, day] = date.split('/');

          if (!monthlySums[month]) {
            monthlySums[month] = { pv: 0, ip: 0 };
          }

          const pair = valuesArray[index];

          if (pair.length === 2) {
            const firstValue = parseFloat(pair[0] as string);
            const secondValue = parseFloat(pair[1] as string);

            if (!isNaN(firstValue) && !isNaN(secondValue)) {
              monthlySums[month].pv += firstValue;
              monthlySums[month].ip += secondValue;
            }
          }
        });

        setOptions((data) => (
          {
            ...data,
            xaxis: { ...options.xaxis, categories: Object.keys(monthlySums) }
          }
        ))

        const list = Object.values(monthlySums)
        const pvList_month = list.map(item => item.pv)
        const ipList_month = list.map(item => item.ip)

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: '访客数量',
              data: pvList_month,
            },
            {
              name: 'IP数量',
              data: ipList_month,
            },
          ],
        }));

        break
      case "year":
        const yearlySums: { [year: string]: { pv: number, ip: number } } = {};

        result.items[0].forEach((dateArray: string[], index: number) => {
          const date: string = dateArray[0];
          const [year, month, day] = date.split('/');

          if (!yearlySums[year]) {
            yearlySums[year] = { pv: 0, ip: 0 };
          }

          const pair = result.items[1][index];
          console.log(pair);

          if (pair.length === 2) {
            const firstValue = parseFloat(pair[0] as string);
            const secondValue = parseFloat(pair[1] as string);

            if (!isNaN(firstValue) && !isNaN(secondValue)) {
              yearlySums[year].pv += firstValue;
              yearlySums[year].ip += secondValue;
            }
          }
        });

        // 删除没有数据的年份
        Object.keys(yearlySums).forEach(year => {
          if (yearlySums[year].pv === 0 && yearlySums[year].ip === 0) {
            delete yearlySums[year];
          }
        });

        setOptions((data) => (
          {
            ...data,
            xaxis: { ...options.xaxis, categories: Object.keys(yearlySums) }
          }
        ));

        const yearlyList = Object.values(yearlySums);
        const pvList_year = yearlyList.map(item => item.pv);
        const ipList_year = yearlyList.map(item => item.ip);

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: '访客数量',
              data: pvList_year,
            },
            {
              name: 'IP数量',
              data: ipList_year,
            },
          ],
        }));

        break
    }
  }, [result])

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>

            <div className="w-full">
              <p className="font-semibold text-primary">访客（UV）</p>
            </div>
          </div>

          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>

            <div className="w-full">
              <p className="font-semibold text-secondary">IP</p>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${scope === "day" ? "bg-white shadow-card" : ""}`} onClick={() => {
              setScope("day")
              setStartDate(dayjs(new Date()).subtract(7, "day").format("YYYY/MM/DD"))
            }}>
              天
            </button>

            <button className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${scope === "month" ? "bg-white shadow-card" : ""}`} onClick={() => {
              setScope("month")
              const year = new Date().getFullYear() + ""
              setStartDate(year + "/01/01")
            }}>
              月
            </button>

            <button className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark ${scope === "year" ? "bg-white shadow-card" : ""}`} onClick={() => {
              setScope("year")
              setStartDate(dayjs(new Date()).subtract(5, "year").format("YYYY/MM/DD"))
            }}>
              年
            </button>
          </div>
        </div>
      </div>

      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartOne;