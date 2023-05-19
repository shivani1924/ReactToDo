import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const TodoList = ({ todos, handleDelete, handleEdit }) => {
  return (
    <>
      {todos.map((t) => (
        // eslint-disable-next-line react/jsx-key
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', margin: 2 }}>
          <ListItem>
            <Box component="div" sx={{ display: 'inline', margin: 2 }}>
              <Box component="span" sx={{ p: 2 }}>
                {t.todo}
              </Box>
              <Box component="span" sx={{ p: 20 }}>
                {new Date(t.startTime).toLocaleTimeString()}
              </Box>
              <Box component="span" sx={{ p: 2 }}>
                {new Date(t.endTime).toLocaleTimeString()}
              </Box>

              <Box component="span" sx={{ p: 2 }}>
                <Button onClick={() => handleEdit(t.id)}>Edit</Button>
                <Button onClick={() => handleDelete(t.id)}>Delete</Button>
              </Box>
            </Box>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </>
  );
};

export default TodoList;

TodoList.propTypes = {
  // Your other propTypes here
  todos: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
