import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import PropTypes from "prop-types"

const SessionList = ({ sessionInformation }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {sessionInformation.map((session) => (
        <div key={session}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={session.user_name}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {session.location_name}
                  </Typography>
                  {" — " + session.session_start_date_time}
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  )
}

SessionList.propTypes = {
  sessionInformation: PropTypes.arrayOf(
    PropTypes.shape({
      user_name: PropTypes.string.isRequired,
      creator_user_id: PropTypes.number.isRequired,
      location_id: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      session_start_date_time: PropTypes.string.isRequired,
      location_name: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default SessionList
