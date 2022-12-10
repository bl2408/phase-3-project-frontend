import { Route, Redirect, Switch } from 'react-router-dom'
import User from './User';
import CreateEdit from './CreateEdit';
import ViewPosts from './ViewPosts';
import { useContext } from 'react';
import { AppContext } from './App';




export default function Content(){
   
    const { appState } = useContext(AppContext);
    const { loggedIn, userData } = appState;

    const redirect =()=>{

        const comp = <Redirect to="/" />;

        if(!loggedIn){
            return comp;
        }

        switch(userData.role){
            case "admin":
            case "editor":
                return null;
            case "member":
            case "public":
            default:
                return comp;
        } 
    };



    return (
        <main>
            <div className="max-content">
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

                    <Route path="*">
                        Page not found!
                    </Route>

                </Switch>
            </div>
        </main>
    );
}