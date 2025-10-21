import {Breadcrumbs, Chip, emphasize, styled} from "@mui/material";
import React, {useMemo} from "react";
import {Link, useLocation} from "react-router-dom";
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
    const location = useLocation();
    const sourceType = useSelector(state => state.sourceType.sourceType);
    const source = useSelector(state => state.source.source);

    // Формируем цепочку «хлебных крошек» с учётом текущего маршрута и выбранных сущностей
    const breadcrumbs = useMemo(() => {
        const items = [];
        const pathnames = location.pathname.split('/').filter(Boolean);

        const pushCrumb = (label, to, options = {}) => {
            items.push({
                label,
                to,
                disabled: options.disabled ?? false,
            });
        };

        // Главная страница присутствует всегда
        pushCrumb("Главная", "/");

        if (pathnames.length === 0) {
            return items;
        }

        let sourceTypeAdded = false;

        pathnames.forEach((segment, index) => {
            const segmentPath = `/${pathnames.slice(0, index + 1).join('/')}`;

            if (segment === "sourceType") {
                if (sourceType) {
                    pushCrumb(`Тип источника: ${sourceType.description}`, "/sourceType", { disabled: false });
                    sourceTypeAdded = true;
                } else {
                    pushCrumb(RouteSettings[segment]?.name ?? "Тип источника", "/sourceType", { disabled: true });
                }
                return;
            }

            if (segment === "test") {
                if (!sourceTypeAdded && sourceType) {
                    pushCrumb(`Тип источника: ${sourceType.description}`, "/sourceType", { disabled: false });
                    sourceTypeAdded = true;
                }

                if (source) {
                    pushCrumb(`Источник: ${source.name}`, undefined, { disabled: true });
                } else {
                    pushCrumb(RouteSettings[segment]?.name ?? "Источник", undefined, { disabled: true });
                }
                return;
            }

            const route = RouteSettings[segment];
            if (!route) {
                pushCrumb(segment, undefined, { disabled: true });
                return;
            }

            pushCrumb(route.name, route.hasRoute ? segmentPath : undefined, { disabled: !route.hasRoute });
        });

        return items;
    }, [location.pathname, sourceType, source]);

    return (
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" /> }>
            {breadcrumbs.map((item, index) => (
                <StyledBreadcrumb
                    key={`${item.label}-${index}`}
                    component={item.to ? Link : "div"}
                    to={item.to}
                    label={item.label}
                    icon={index === 0 ? <HomeIcon fontSize="small" /> : undefined}
                    disabled={item.disabled}
                />
            ))}
        </Breadcrumbs>
    );
}
