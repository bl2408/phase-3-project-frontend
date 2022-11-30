import { Route, Redirect, Switch } from 'react-router-dom'
import User from './User';
import ViewPosts from './ViewPosts';


export default function Content(){
   

    return (
        <main>
        <Switch>
            <Route exact path={["/", "/posts"]}>
                <ViewPosts />
            </Route>

            <Route exact path="/posts/:id">
                <ViewPosts />
            </Route>

            <Route exact path={["/users", "/users/:id"]}>
                <User />
            </Route>

            <Route exact path="/users/:userId/posts/">
                <ViewPosts />
            </Route>
        </Switch>
        </main>
    );
}