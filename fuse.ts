import { fusebox } from 'fuse-box'

const fuse = fusebox({
  entry: 'src/index.tsx',
  target: 'browser',
  devServer: true,
  webIndex: true,
  stylesheet: {
    paths: ['src/'],
  },
  compilerOptions: {
    tsConfig: "src/tsconfig.json"
  }
});

fuse.runDev();
