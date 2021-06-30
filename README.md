# UIC Grace Shopper Template
Group Members: Jason Van Havel, Michael LaDouceur, Viral Bhavsar, Steven Zhao

Grace Shopper Project Description:
We will be creating a fully deployed e-commerce website that will let our customers purchase tickets as our products
to venues/events such as Carnivals, Museums, Amusement Parks, Aquariums, Zoos, Roadside Attractions, etc. 

Our website will allow guests AND signed in users add items to their cart and proceed to checkout as a guest or an authenticated user.

The cart will be completely saved and stored in our database so their items will not be deleted upon refreshing or exiting the website.
Our customers will have the options to view their order history, update the quantity of items, remove items, and also add products to their wishlist if they want.

## ------- [WORK IN PROGRESSS] -------------

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add gs-uic-template https://github.com/FullstackAcademy/gs-uic-template.git
git fetch gs-uic-template
git merge gs-uic-template/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create a postgres databases `grace-shopper`:

```
createdb grace-shopper
```

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:react will start just the react code by itself
- start:server will start your server by itself

Windows users might have to use the solo commands to get it working :/
