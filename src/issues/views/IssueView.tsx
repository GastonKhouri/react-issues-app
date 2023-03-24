import { Link, Navigate, useParams } from 'react-router-dom';
import { useIssue } from '../../hooks';
import { IssueComment } from '../components';
import { LoadingIcon } from '../../shared/components';

export const IssueView = () => {

	const { id = 0 } = useParams();

	const { issueQuery, commentsQuery } = useIssue( +id );

	const { isLoading, data } = issueQuery;

	if ( isLoading ) {
		return <LoadingIcon />;
	}

	if ( !data ) {
		return <Navigate to="/issues/list" />;
	}

	return (
		<div className="row mb-5">
			<div className="col-12 mb-3">
				<Link to='./issues/list'>Go Back</Link>
			</div>

			{/* Primer comentario */ }
			<IssueComment issue={ data } />

			{/* Comentario de otros */ }
			{
				commentsQuery.isLoading && <LoadingIcon />
			}
			{
				commentsQuery.data?.map( comment => (
					<IssueComment key={ comment.id } issue={ comment } />
				) )
			}
		</div>
	);
};
