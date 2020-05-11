export default (req, res) => {
  res.setPreviewData({});
  console.log("Enabled preview mode!");
  res.writeHead(307, { Location: '/' });
  res.end();
}
