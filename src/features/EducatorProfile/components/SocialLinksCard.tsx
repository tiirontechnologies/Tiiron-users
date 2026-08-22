
import React from 'react';
import { Card, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
  LinkedIn,
  GitHub,
  Language,
  YouTube,
  Facebook,
  Instagram,
  Twitter,
  Code,
  ChevronRight,
} from '@mui/icons-material';
import { SocialLink } from '../types/educator.types';

const PLATFORM_ICON: Record<SocialLink['platform'], React.ReactNode> = {
  linkedin: <LinkedIn sx={{ color: '#0077B5' }} />,
  github: <GitHub sx={{ color: '#24292E' }} />,
  website: <Language sx={{ color: '#10B981' }} />,
  youtube: <YouTube sx={{ color: '#EF4444' }} />,
  facebook: <Facebook sx={{ color: '#1877F2' }} />,
  instagram: <Instagram sx={{ color: '#E4405F' }} />,
  twitter: <Twitter sx={{ color: '#1DA1F2' }} />,
  leetcode: <Code sx={{ color: '#F59E0B' }} />,
  hackerrank: <Code sx={{ color: '#00EA64' }} />,
};

interface SocialLinksCardProps {
  links: SocialLink[];
}

export default function SocialLinksCard({ links }: SocialLinksCardProps) {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', p: 1, mb: 3 }}>
      <Typography sx={{ px: 2, py: 1, fontWeight: 700, fontSize: 14 }}>Connect</Typography>
      {links?.length > 0 ? (
        <List dense>
          {links.map((item) => (
            <ListItem
              key={item.platform}
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              secondaryAction={<ChevronRight fontSize="small" color="disabled" />}
              sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{PLATFORM_ICON[item.platform]}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItem>
          ))}
        </List>
      ) : (
      <Typography
  variant="body2"
  color="text.secondary"
  sx={{ px: 2, pb: 2, fontSize: 13, lineHeight: 1.6 }}
>
  Social profiles have not been added by this educator yet.
</Typography>

      )}
    </Card>
  );
}