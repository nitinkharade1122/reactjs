import { Button } from '@mui/material'
import { PageHeader, PageTitleWrapper, TextField } from '../../shared/components';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';




const DashboardHeader = ({ title, onAddTenantClick,
    onAddAuthConfigClick, showAddButton = true, showAddAuthConfigButton = true }) => {

    /**
     * Extracts the first word from a given phrase.
     * @param phrase - The phrase to extract the first word from.
     * @returns The first word from the phrase.
     */
    const extractFirstWord = (phrase: string): string => {
        if (!phrase) return "";
        return phrase.split(" ")[0];
    };

    const extractedWord = extractFirstWord(title);


    return (
        <>
            <PageTitleWrapper>
                <PageHeader
                    heading={title}
                    subHeading={`List of all ${extractedWord} from Indexnine`}
                >
                    {showAddButton && (
                        <Button
                            size={'small'}
                            sx={{ pt: 1, pb: 1 }}
                            className="letter-spacing"
                            variant={'contained'}
                            startIcon={<AddTwoToneIcon fontSize="small" />}
                            onClick={onAddTenantClick}
                        >
                            {`Add ${extractedWord}`}
                        </Button>
                    )}
                    {showAddAuthConfigButton && (
                        <Button
                            size={'small'}
                            sx={{ pt: 1, pb: 1 }}
                            className="letter-spacing"
                            variant={'contained'}
                            startIcon={<AddTwoToneIcon fontSize="small" />}
                            onClick={onAddAuthConfigClick}
                        >
                            {`Add Auth Config`}
                        </Button>
                    )}
                    <TextField
                        size={'small'}
                        id="outlined-search"
                        label={`Search By ${extractedWord}`}
                        type="search"
                    // onChange={(e) => handleFilterUsers(e.target.value)}
                    />

                </PageHeader>
            </PageTitleWrapper>
        </>
    )
}

export default DashboardHeader
