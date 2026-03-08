# Publishing swiftui-rn

This guide provides the exact steps to publish the swiftui-rn package to npm.

## Prerequisites

Before publishing, ensure you have:

1. An npm account (create one at https://www.npmjs.com/signup if you don't have one)
2. Node.js and npm installed on your machine
3. Completed the package development and testing

## Pre-Publish Checklist

Before publishing, make sure to:

1. **Update the author field** in [`package.json`](package.json:17):
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

2. **Optionally add a repository URL** in [`package.json`](package.json:1):
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/your-username/swiftui-rn.git"
   }
   ```

3. **Verify the version number** in [`package.json`](package.json:3):
   ```json
   "version": "0.1.0"
   ```
   Update this if you're releasing a new version.

4. **Review the package description** and keywords in [`package.json`](package.json:4).

## Publishing Steps

Follow these exact commands to publish the package:

### Step 1: Build the package

```bash
npm run build
```

This compiles the TypeScript source files to JavaScript in the `dist/` directory and generates type declaration files.

### Step 2: Login to npm

```bash
npm login
```

You will be prompted for:
- Your npm username
- Your npm password
- Your npm email (if not already verified)

### Step 3: Publish the package

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (packages starting with `@`) to make them publicly available. For non-scoped packages like `swiftui-rn`, this flag is optional but recommended for clarity.

### Step 4: Verify the package

After publishing, verify the package is available:

```bash
npm view swiftui-rn
```

Or visit https://www.npmjs.com/package/swiftui-rn

## Troubleshooting

### Package name already taken

If you get an error that the package name is already taken, you'll need to choose a different name. Update the `name` field in [`package.json`](package.json:2) and republish.

### Authentication errors

If you encounter authentication errors:
```bash
npm logout
npm login
```

Then try publishing again.

### Version conflicts

If you're trying to publish a version that already exists:
1. Update the version in [`package.json`](package.json:3)
2. Run `npm run build` again
3. Publish again

### Build errors

If the build fails:
1. Ensure all TypeScript errors are resolved
2. Check that `node_modules` is installed: `npm install`
3. Verify the TypeScript configuration in [`tsconfig.json`](tsconfig.json:1)

## Post-Publishing

After successful publication:

1. **Test installation** in a new project:
   ```bash
   npm install swiftui-rn
   ```

2. **Update documentation** if needed (README, examples, etc.)

3. **Announce the release** (blog post, social media, etc.)

4. **Tag the release** in your version control system:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

## Future Releases

For subsequent releases:

1. Update the version in [`package.json`](package.json:3) following semantic versioning:
   - `0.1.0` → `0.1.1` for bug fixes (patch)
   - `0.1.0` → `0.2.0` for new features (minor)
   - `0.1.0` → `1.0.0` for breaking changes (major)

2. Build the package:
   ```bash
   npm run build
   ```

3. Publish:
   ```bash
   npm publish --access public
   ```

## Unpublishing (Emergency Only)

**Warning:** Unpublishing is generally discouraged and should only be done in emergencies. If you need to unpublish:

```bash
npm unpublish swiftui-rn --force
```

Note: npm only allows unpublishing within 72 hours of publication for packages with no dependents.

## Support

For issues or questions about swiftui-rn, please open an issue on the GitHub repository or contact the package maintainer.
