import {Breadcrumbs, Chip, emphasize, styled} from "@mui/material";
import React from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {RouteSettings} from "../Configs/RouteSettings";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useSelector} from "react-redux";

const StyledBreadcrumb = styled(Chip)(({ theme, disabled }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[700];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
            cursor: disabled ? "default" : "pointer"
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});
export default function BreadcrumbsComponent(){
    const sourceType = useSelector(state => state.sourceType.sourceType);
    let location = useLocation();
    let pathnames = location.pathname.split('/').filter(x => x);
    return (
        <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
            <StyledBreadcrumb component={Link} label="Главная" to="/" icon={<HomeIcon fontSize="small" />}/>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const route = RouteSettings[value];
                if(!route)
                {
                    return <StyledBreadcrumb component={Link} label={value} disabled={true} key={index}/>
                }
                if(!route.hasRoute)
                {
                    return <StyledBreadcrumb component={Link} label={route.name} disabled={true} key={index}/>
                }
                if(route.hasRoute)
                {
                    if(route.name === "Тип источника")
                    {
                        if(sourceType === null)
                        {
                            return <Navigate to="/archive" replace key={index}/>;
                        }
                        else
                        {
                            return <StyledBreadcrumb component={Link} label={`${route.name}: ${sourceType.description}`} to={to} key={index}/>
                        }
                    }
                    return <StyledBreadcrumb component={Link} label={route.name} to={to} key={index}/>
                }
                return <StyledBreadcrumb component={Link} label={value} disabled={true} key={index}/>
            })}
        </Breadcrumbs>
    );
}