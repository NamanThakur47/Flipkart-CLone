import { createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme , ThemeProvider } from "@material-ui/core/styles";

const TemplateContext = createContext(null);

export const TemplateProvider = ({children}) =>{
    const theme = createMuiTheme({
        overrides:{
            MuiDialog:{
                paperWidthSm:{
                    maxWidth:'none',
                }
            },
            MuiDialogContent:{
                root:{
                    padding:0,
                    '&:first-child':{
                        paddingTop:0,
                    }
                }
            },
            MuiTableCell:{
                root:{
                    borderBottom:'none',
                }

            }

        }
    })

    return(
        <TemplateContext.Provider>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    )
}