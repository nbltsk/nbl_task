export interface ChartOptions {
    xAxis: XAxis;
    yAxis: YAxis;
    series: SeriesData[];
    tooltip: Tooltip;
}

interface DefaultAxis {
    type: string;
}

interface XAxis extends DefaultAxis {
    data: Number[];
}

interface YAxis extends DefaultAxis {}

interface SeriesData {
    data: Number[];
    seriesName: string,
    type: string,
    itemStyle: ItemStyle,
}

type ItemStyle = {
    color: string
}

interface Tooltip {
    trigger: string,
    formatter: string,
}