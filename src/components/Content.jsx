import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import User from './User';
import CreateEdit from './CreateEdit';
import ViewPosts from './ViewPosts';
import { useContext } from 'react';
import { AppContext } from './App';


export default function Content(){
   
    const { appState } = useContext(AppContext);
    const { loggedIn } = appState;

    const redirect =()=>{
        return !loggedIn ? <Redirect to="/" /> : null
    };

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

                <Route exact path="/users/:userId/create">
                    { redirect() }
                    <CreateEdit mode={"create"}/>
                </Route>

                <Route exact path="/posts/:id/edit">
                    { redirect() }
                    <CreateEdit mode={"edit"}/>
                </Route>

            </Switch>
        </main>
    );
}