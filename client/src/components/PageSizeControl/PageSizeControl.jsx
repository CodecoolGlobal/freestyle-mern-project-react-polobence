function PageSizeControl({ pageSize, setPageSize }) {
  return (
    <div>
      <label>Set games amount per page</label>
      <select onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
        <option value="">Select amount</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
      </select>
    </div>
  );
}

export default PageSizeControl;
