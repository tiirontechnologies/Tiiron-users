import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CustomAccordionProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
    title,
    icon,
    children,
    defaultExpanded = false,
}) => {
    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            sx={{
                backgroundColor: "#0f0f12 !important",
                color: "#fff",
                borderBottom: "1px solid #27272a",
                "&:before": {
                    display: "none"
                },
                "&.Mui-expanded": {
                    margin: 0,
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                sx={{
                    px: 2,
                    minHeight: 48,
                    backgroundColor: "#0f0f12 !important",
                    "& .MuiAccordionSummary-content": {
                        display: "flex",
                        alignItems: "center",
                        my: 1,
                    }
                }}
            >
                {icon && <Box component="span" sx={{ mr: 1, display: "flex", alignItems: "center" }}>{icon}</Box>}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                px: 2,
                pb: 2,
                pt: 0,
                backgroundColor: "#0f0f12 !important",
                color: "white !important"
            }}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
