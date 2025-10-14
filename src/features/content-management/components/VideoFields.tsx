import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadBox from '@components/ui/uploadbox/UploadBox';
import { Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/PlayCircleOutline';

export default function UploadPage() {
    const [editorValue, setEditorValue] = useState('');
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
            gap: "56px", // Optional: to set space between grid items
        }}>
            <Box width={"492px"} height={"201px"}>
                <UploadBox icon={<CloudUploadIcon sx={{ fontSize: 28, color: '#7e22ce' }} />} description={" (Max. File size: 25 MB)"} coloredTitle={"Click to Upload "} title={"or drag and drop"} />
            </Box>
            <Box width={"492px"} height={"201px"}>
                <UploadBox icon={<CloudUploadIcon sx={{ fontSize: 28, color: '#7e22ce' }} />} description={""} coloredTitle={"Embed Video "} title={"From Youtube etc"} />
            </Box>
        </Box>
    )
}
