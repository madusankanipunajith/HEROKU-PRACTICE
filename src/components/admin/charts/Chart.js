import React from 'react'
import './Chart.css'
import '../../../../node_modules/react-vis/dist/style.css'
import { XYPlot, LineSeries, XAxis, YAxis, makeWidthFlexible, VerticalGridLines, HorizontalGridLines} from 'react-vis'
import { Fragment,useMemo } from 'react'
import Loader from '../../layout/Loader'


function Chart(props) {
    var data = props.incomeData;

    function compare(a,b){
        if(a.x < b.x){
            return -1;
        }
        if(a.x > b.x){
            return 1;
        }

        return 0;
    }

    data.sort(compare)
    //setData(props.incomeData)
    /**const data =[
        {x:9, y:8},
        {x:8, y:3},
        {x:7, y:8},
        {x:6, y:4},
        {x:5, y:8},
        {x:4, y:9},
        {x:3, y:8},
        {x:2, y:4},
        {x:1, y:10},
        {x:0, y:4},
    ]  */

    var FlexibleXYPlot = useMemo(() => makeWidthFlexible(XYPlot),[]);
    
    return (
        
        <Fragment>
            {data.length === 0 ? <Loader/>: <div className="chart">
        
            <FlexibleXYPlot width={400} height={300}>
                <HorizontalGridLines />
                <VerticalGridLines/>
                <XAxis  title="Last Days" position="middle"/>
                <YAxis title="Income"/>
                <LineSeries data={data} color="purple"/>
            </FlexibleXYPlot>
            </div>}
            

            <div className="chart-responsive">
                <FlexibleXYPlot width={300} height={300}>
                    <HorizontalGridLines />
                    <VerticalGridLines/>
                    <XAxis title="Last Days" position="middle"/>
                    <YAxis title="Income"/>
                    <LineSeries data={data} color="purple"/>
                </FlexibleXYPlot>
            </div>
        </Fragment>
    )
}

export default Chart
