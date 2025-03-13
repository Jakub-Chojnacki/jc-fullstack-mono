/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as SigninImport } from './routes/signin'
import { Route as IndexImport } from './routes/index'
import { Route as AppRouteImport } from './routes/app/_route'
import { Route as AppRouteIndexImport } from './routes/app/_route.index'
import { Route as AppRouteShoppingImport } from './routes/app/_route.shopping'
import { Route as AppRouteRecipesImport } from './routes/app/_route.recipes'
import { Route as AppRouteIngredientsImport } from './routes/app/_route.ingredients'

// Create Virtual Routes

const AppImport = createFileRoute('/app')()

// Create/Update Routes

const AppRoute = AppImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/_route',
  getParentRoute: () => AppRoute,
} as any)

const AppRouteIndexRoute = AppRouteIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppRouteShoppingRoute = AppRouteShoppingImport.update({
  id: '/shopping',
  path: '/shopping',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppRouteRecipesRoute = AppRouteRecipesImport.update({
  id: '/recipes',
  path: '/recipes',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppRouteIngredientsRoute = AppRouteIngredientsImport.update({
  id: '/ingredients',
  path: '/ingredients',
  getParentRoute: () => AppRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/app/_route': {
      id: '/app/_route'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof AppRoute
    }
    '/app/_route/ingredients': {
      id: '/app/_route/ingredients'
      path: '/ingredients'
      fullPath: '/app/ingredients'
      preLoaderRoute: typeof AppRouteIngredientsImport
      parentRoute: typeof AppRouteImport
    }
    '/app/_route/recipes': {
      id: '/app/_route/recipes'
      path: '/recipes'
      fullPath: '/app/recipes'
      preLoaderRoute: typeof AppRouteRecipesImport
      parentRoute: typeof AppRouteImport
    }
    '/app/_route/shopping': {
      id: '/app/_route/shopping'
      path: '/shopping'
      fullPath: '/app/shopping'
      preLoaderRoute: typeof AppRouteShoppingImport
      parentRoute: typeof AppRouteImport
    }
    '/app/_route/': {
      id: '/app/_route/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppRouteIndexImport
      parentRoute: typeof AppRouteImport
    }
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppRouteIngredientsRoute: typeof AppRouteIngredientsRoute
  AppRouteRecipesRoute: typeof AppRouteRecipesRoute
  AppRouteShoppingRoute: typeof AppRouteShoppingRoute
  AppRouteIndexRoute: typeof AppRouteIndexRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppRouteIngredientsRoute: AppRouteIngredientsRoute,
  AppRouteRecipesRoute: AppRouteRecipesRoute,
  AppRouteShoppingRoute: AppRouteShoppingRoute,
  AppRouteIndexRoute: AppRouteIndexRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface AppRouteChildren {
  AppRouteRoute: typeof AppRouteRouteWithChildren
}

const AppRouteChildren: AppRouteChildren = {
  AppRouteRoute: AppRouteRouteWithChildren,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/app': typeof AppRouteRouteWithChildren
  '/app/ingredients': typeof AppRouteIngredientsRoute
  '/app/recipes': typeof AppRouteRecipesRoute
  '/app/shopping': typeof AppRouteShoppingRoute
  '/app/': typeof AppRouteIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/app': typeof AppRouteIndexRoute
  '/app/ingredients': typeof AppRouteIngredientsRoute
  '/app/recipes': typeof AppRouteRecipesRoute
  '/app/shopping': typeof AppRouteShoppingRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/signin': typeof SigninRoute
  '/signup': typeof SignupRoute
  '/app': typeof AppRouteWithChildren
  '/app/_route': typeof AppRouteRouteWithChildren
  '/app/_route/ingredients': typeof AppRouteIngredientsRoute
  '/app/_route/recipes': typeof AppRouteRecipesRoute
  '/app/_route/shopping': typeof AppRouteShoppingRoute
  '/app/_route/': typeof AppRouteIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/signin'
    | '/signup'
    | '/app'
    | '/app/ingredients'
    | '/app/recipes'
    | '/app/shopping'
    | '/app/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/signin'
    | '/signup'
    | '/app'
    | '/app/ingredients'
    | '/app/recipes'
    | '/app/shopping'
  id:
    | '__root__'
    | '/'
    | '/signin'
    | '/signup'
    | '/app'
    | '/app/_route'
    | '/app/_route/ingredients'
    | '/app/_route/recipes'
    | '/app/_route/shopping'
    | '/app/_route/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SigninRoute: typeof SigninRoute
  SignupRoute: typeof SignupRoute
  AppRoute: typeof AppRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SigninRoute: SigninRoute,
  SignupRoute: SignupRoute,
  AppRoute: AppRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/signin",
        "/signup",
        "/app"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/app": {
      "filePath": "app",
      "children": [
        "/app/_route"
      ]
    },
    "/app/_route": {
      "filePath": "app/_route.tsx",
      "parent": "/app",
      "children": [
        "/app/_route/ingredients",
        "/app/_route/recipes",
        "/app/_route/shopping",
        "/app/_route/"
      ]
    },
    "/app/_route/ingredients": {
      "filePath": "app/_route.ingredients.tsx",
      "parent": "/app/_route"
    },
    "/app/_route/recipes": {
      "filePath": "app/_route.recipes.tsx",
      "parent": "/app/_route"
    },
    "/app/_route/shopping": {
      "filePath": "app/_route.shopping.tsx",
      "parent": "/app/_route"
    },
    "/app/_route/": {
      "filePath": "app/_route.index.tsx",
      "parent": "/app/_route"
    }
  }
}
ROUTE_MANIFEST_END */
