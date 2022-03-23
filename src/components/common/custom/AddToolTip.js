import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const AddToolTip = props => {
const { children,...rest} = props;

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const classes = useStylesBootstrap();
return (<div>
<Tooltip arrow classes={classes} {...props}>
 {children}
 </Tooltip> 
 </div>)

}