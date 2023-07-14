import Chart from 'react-apexcharts'
import EFCCLogo from "../../../assets/images/efcc_logo.png";

/*const chartData = {
    categories: ["Assets up for claim", "Pending court verdict"],
    data: [35, 62]
}*/

const BarChartComp = ({ title, chartData, color, isLoading }) => {
    let options = {
        chart: {
            id: "dashboard_total_submitted_data",
            animations: {
                initialAnimation: { enabled: true },
            },
        },
        colors: color,
        dataLabels: {
            enabled: false
        },
        labels: chartData.categories,   //["Assets up for claim", "Pending court verdict"],
        plotOptions: {
            bar: {
                columnWidth: '20%',
            }
        },
        title: {
            text: title,
            align: "left",
            style: {
                fontSize: '14px',
                fontWeight: '500',
                color: "#676767",
            },
        },
        tooltip: {
            y: {
                formatter: (val) => {
                    return `₦${val.toLocaleString()}`;
                }
            }
        },
        xaxis: {
            categories: chartData.categories,
            labels: {
                style: {
                    fontSize: '10px',
                },
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return val.toLocaleString();
                }
            }
        },
        noData: {
            text: "No available loan data",
            align: "center",
            verticalAlign: "middle",
        },
    };
    const series = [{
        name: "Assets",
        data: chartData.data,
    }];
    // console.log("TAB ONE LOADING::: ", isTabOneLoading);


    return (
        <section className="px-2 pt-4 shadow shadow-lg z-10">

            { (!isLoading) ? (
                <Chart options={ options } series={ series } type="bar" height={"320px"} width={"100%"} />
            ) : (
                <p className="h-[320px] w-[100%] grid place-items-center">
                    <img src={ EFCCLogo } alt="EFCC Logo" className="h-auto w-[50px] md:w-[60px] animate-bounce opacity-30" />
                </p>
            ) }
        </section>
    );
};

export default BarChartComp;
