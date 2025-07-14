import UploadBox from '@components/ui/uploadbox/UploadBox';
import { Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/PlayCircleOutline';

export default function UploadPage() {
    return (
        <Box sx={{
            display: "flex",
            gap: "56px"
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
