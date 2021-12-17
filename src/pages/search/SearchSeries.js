import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllSeries} from "../../services/seriesService";

const columns = [
    {field: 'id', headerName: 'ID Study', width: 100, editable: false},
    {field: 'seriesName', headerName: 'Name Patient', width: 180, editable: true},
    {field: 'createdAt', headerName: 'Created at', width: 160, editable: true},
    {field: 'updatedAt', headerName: 'Updated at', width: 160, editable: true},
];

export default function DataTable() {
    const [seriesState, setSeriesState] = useState({
        series: [{
            id: '',
            seriesName: "",
            createdAt: "",
            updatedAt: ""
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllSeries();
            const series = result.data.data.getAllSeries;
            series.map(series => {
                series.createdAt = new Date(parseInt(series.createdAt)).toLocaleString()
                series.updatedAt = new Date(parseInt(series.updatedAt)).toLocaleString()
            })

            setSeriesState({series: result.data.data.getAllSeries});
        }

        fetchData();
    }, []);
    return (
        <div style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rows={seriesState.series}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}
