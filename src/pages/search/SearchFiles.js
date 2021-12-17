import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllFiles} from "../../services/fileService";

const columns = [
    {field: 'id', headerName: 'ID File', width: 100, editable: false},
    {field: 'filePath', headerName: 'File Path', width: 350, editable: true},
    {field: 'createdAt', headerName: 'Created at', width: 160, editable: true},
    {field: 'updatedAt', headerName: 'Updated at', width: 160, editable: true},
];

export default function DataTable() {
    const [filesState, setFilesState] = useState({
        files: [{
            "id": '',
            "filePath": "",
            "createdAt": "",
            "updatedAt": "",
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllFiles();
            const files = result.data.data.getAllFiles;
            files.map(file => {
                file.createdAt = new Date(parseInt(file.createdAt)).toLocaleString()
                file.updatedAt = new Date(parseInt(file.updatedAt)).toLocaleString()
            })

            setFilesState({files: result.data.data.getAllFiles});
        }

        fetchData();
    }, []);
    return (
        <div style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rows={filesState.files}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}
