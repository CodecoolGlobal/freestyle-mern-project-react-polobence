export default function ConfirmDelete ({ handleDelete, handleCancel }) {

    return (
        <div className="confirmDelete">
            <h4>Are you sure?</h4>
            <button onClick={handleDelete}>YES</button>
            <button onClick={handleCancel}>NO</button>
        </div>
    )
}