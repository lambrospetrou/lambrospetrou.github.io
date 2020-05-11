export default (req, res) => {
  res.clearPreviewData();
  console.log("Disabled preview mode!");
  res.writeHead(307, { Location: '/' });
  res.end();
}
