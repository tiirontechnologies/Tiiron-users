import UploadBox from '@components/ui/uploadbox/UploadBox';
import { Box, Typography, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/PlayCircleOutline';
import { Controller } from 'react-hook-form';

type Props = {
    control: any;
    errors: any;
    clearErrors: (name?: any) => void;
    watch: (name?: any) => any;
    setValue: (name: string, value: any, options?: any) => void;
};

function getYouTubeEmbed(url: string): string | null {
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) {
            const v = u.searchParams.get('v');
            return v ? `https://www.youtube.com/embed/${v}` : null;
        }
        if (u.hostname.includes('youtu.be')) {
            const id = u.pathname.replace('/', '');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        return null;
    } catch {
        return null;
    }
}

export default function VideoFields({ control, errors, clearErrors, watch, setValue }: Props) {
    const videoUrl: string = watch('videoUrl');
    const videoFileName: string = watch('videoFileName');

    const handleFiles = (files: FileList) => {
        const file = files && files[0];
        if (!file) return;
        setValue('videoFileName', file.name, { shouldValidate: true, shouldDirty: true });
        // If a file is chosen, clear link errors
        clearErrors('videoUrl');
    };

    const renderPreview = () => {
        if (!videoUrl) return null;
        const yt = getYouTubeEmbed(videoUrl);
        if (yt) {
            return (
                <Box sx={{ mt: 2 }}>
                    <Box component="iframe" src={yt} sx={{ width: '100%', height: 240, border: 0, borderRadius: 1.5 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                </Box>
            );
        }
        const isDirectVideo = /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(videoUrl);
        if (isDirectVideo) {
            return (
                <Box sx={{ mt: 2 }}>
                    <Box component="video" src={videoUrl} sx={{ width: '100%', height: 240, borderRadius: 1.5 }} controls />
                </Box>
            );
        }
        return null;
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Typography mb={1}>Video link:</Typography>
            <Controller
                name="videoUrl"
                control={control}
                rules={{
                    validate: (value: string) => {
                        const hasLink = !!(value && value.trim());
                        const hasFile = !!(videoFileName && String(videoFileName).trim());
                        return hasLink || hasFile || 'Provide a link or upload a file';
                    }
                }}
                render={({ field }) => (
                    <Box sx={{ mb: 0 }}>
                        <TextField
                            {...field}
                            fullWidth
                            placeholder="Paste YouTube/Vimeo or direct .mp4 link"
                            variant="outlined"
                            error={!!errors.videoUrl}
                            helperText={errors.videoUrl?.message as string}
                            sx={{
                                backgroundColor: "#FAFAFB",
                                borderRadius: 1.5,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    '& fieldset': { borderColor: '#D0D5DD' },
                                    '&:hover fieldset': { borderColor: '#98A2B3' },
                                    '&.Mui-focused fieldset': { borderColor: '#6A42AB', borderWidth: 2 },
                                },
                            }}
                            onChange={(e) => {
                                clearErrors('videoUrl');
                                field.onChange(e.target.value);
                            }}
                        />
                    </Box>
                )}
            />

            {renderPreview()}

            <Typography mb={1}>Upload video (optional if link provided):</Typography>
            <Box width={'100%'}>
                <UploadBox
                    icon={<CloudUploadIcon sx={{ fontSize: 28, color: '#7e22ce' }} />}
                    description={" (Max. File size: 25 MB)"}
                    coloredTitle={"Click to Upload "}
                    title={"or drag and drop"}
                    onFilesDropped={handleFiles}
                />
            </Box>
            {videoFileName && (
                <Typography sx={{ mt: 1, color: '#667085' }}>Selected: {videoFileName}</Typography>
            )}
            {(!videoUrl && !videoFileName) && (
                <Typography color="error" sx={{ mt: 1 }}>Provide a link or upload a file</Typography>
            )}
        </Box>
    )
}
