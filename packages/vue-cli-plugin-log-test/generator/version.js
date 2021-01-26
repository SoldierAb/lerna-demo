import pkg from "../../../package.json";

console.log(
  `%c ${pkg.name} %c v${pkg.version} %c`,
  "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
  "background:#1890ff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
  "background:transparent"
);
