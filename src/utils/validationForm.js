export default function validateForm(values) {
    let errors = {};
    if(!values.title) {
        errors.title = "Title is empty!";
    }
    if(!values.sDescript) {
        errors.sDescript = "Short description is empty!";
    } else if(values.sDescript.length > 160) {
        errors.sDescript = "Short description exceeds 160 characters!";
    }
    if(!values.fDescript) {
        errors.fDescript = "Full description  is empty!";
    }
    if(!values.route) {
        errors.pathLength = "path direction is missing!";
    } else if(values.route.length <= 1) {
        errors.pathLength = "path direction is too short!";
    }
    return errors;
}